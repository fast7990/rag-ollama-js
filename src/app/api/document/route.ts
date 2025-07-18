import { supabaseClient } from '@/app/lib/supabase';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { vectorStore } from '@/app/lib/supabase';

export async function GET(req: Request) {
    const userId = req.headers.get('User-Id');
    const { data, error } = await supabaseClient
        .storage
        .from('document_store')
        .list('', { search: userId || '' });

    if (error || !data.length || !data[0].name.includes(userId || '')) {
        return new Response(error?.message || 'Document search failed', { status: 400 });
    }
    const { data: fileData, error: fileError } = await supabaseClient
        .storage
        .from('document_store')
        .download(data[0].name);

    if (fileError) {
        return new Response(fileError?.message || 'Document fetch failed', { status: 400 });
    }

    return new Response(fileData);
}

export async function POST(req: Request) {
    const userId = req.headers.get('User-Id');
    if (!userId) return new Response('User ID is required', { status: 400 });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return new Response('文件是必填项', { status: 400 });

    const fileExtension = file?.name.split('.').pop();
    if (!fileExtension) return new Response('无法确定文件扩展名', { status: 400 });

    const { data, error } = await supabaseClient
        .storage
        .from('document-store')
        .upload(`${userId}.${fileExtension}`, file, { upsert: true, contentType: file.type, });

    if (error) return new Response(error.message || '上传失败', { status: 400 });

    const pdfLoader = new PDFLoader(file, { splitPages: true, parsedItemSeparator: '' });
    const pdfDoc = await pdfLoader.load();

    const pageContent = pdfDoc.map(doc => doc.pageContent);
    const pageHeaders = pdfDoc.map(doc => ({
        documentName: `${userId}.${fileExtension}`,
        pageNumber: doc?.metadata?.loc?.pageNumber,
        userId,
    }));

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 100,
        separators: ['\n\n', '\n', ' ', ''],
    });

    const docOutput = await splitter.createDocuments([...pageContent], pageHeaders);
    const { error: deleteError } = await supabaseClient.rpc('delete_documents_by_user', { userid: userId });
    if (deleteError) throw new Response('删除旧文档失败！', { status: 400 });

    await vectorStore().addDocuments(docOutput);
    return new Response('', { status: 201 });
}