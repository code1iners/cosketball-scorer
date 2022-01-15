import { MAIL_GUN_KEY } from "@env";

const useEmail = () => {
  /**
   * ### Send email by mail gun.
   * @param {string} email Target email.
   */
  const sendEmail = async ({ to, from, subject, html }) => {
    const uri =
      "https://api.mailgun.net/v3/sandbox72f9dd9263e74c9fb08fc745ba0f241e.mailgun.org/messages";
    const requestBody = `from=${from}&to=${to}&subject=${subject}&html=${html}`;
    const { id, message } = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${MAIL_GUN_KEY}`,
      },
      body: requestBody,
    })
      .then((res) => res.json())
      .catch(console.error);

    // Failed.
    if (!id) {
      return {
        ok: false,
        error: message,
      };
    }

    // Succeed.
    return {
      ok: true,
      data: {
        id,
        message,
      },
    };
  };

  return {
    sendEmail,
  };
};

export default useEmail;
