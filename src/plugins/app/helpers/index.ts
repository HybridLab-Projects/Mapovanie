import Axios from 'axios';

export default {
  getBase64FromBlobUrl: async (imageBlobUrl: string, imageFormat: string): Promise<string> => {
    console.log('tt');
    const blob = await Axios.get(imageBlobUrl, { responseType: 'blob' })
      .then((res) => new Blob([res.data], { type: `image/${imageFormat}` }));

    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
          reject();
        };
        reader.readAsDataURL(blob);
      },
    );
  },
};
