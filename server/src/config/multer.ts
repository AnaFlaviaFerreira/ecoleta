import multer from 'multer';
import path from 'path';
import crypto from 'crypto';//nome dos arquivos 

export default{
    storage: multer.diskStorage({
        //onde vão parar os arquivos do usuário
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename(request,file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
};