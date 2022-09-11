import path from 'path';

export const uploadImage = async (req, res) => {
  try {
    const file = req.files.image;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (file.size > 2 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: 'File size is too large. Max 2mb' });
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return res
        .status(400)
        .json({ message: 'File format is incorrect. Only .png and .jpeg' });
    }

    const __dirname = path.resolve();
    const fileName = Date.now() + '-' + file.name;
    const filePath = `/uploads/${fileName}`;
    const storagePath = path.join(__dirname, 'public', filePath);
    file.mv(storagePath, (error) => {
      if (error) {
        console.error('uploadImage - error', error);
        return res.status(500).send(error);
      }

      res.json({ url: filePath });
    });
  } catch (error) {
    console.error('uploadImage - error', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
