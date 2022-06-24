export const api = {
  getCertificates: (elementCode) => {
    const url = elementCode?.length
      ? `${import.meta.env.VITE_API_URL}/certificates/${elementCode}`
      : `${import.meta.env.VITE_API_URL}/certificates`;

    return fetch(url).then((res) => res.json());
  },
};
