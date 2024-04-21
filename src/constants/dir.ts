import path from 'path'

/**
 * D:\NodeJS\Medpro_BE => path.resolve()
 * D:\NodeJS\Medpro_BE\uploads => path.resolve('uploads')
 */

export const UPLOAD_IMAGE_TEMP_DIR = path.resolve('uploads/images/temp')
export const UPLOAD_IMAGE_DIR = path.resolve('uploads/images')
