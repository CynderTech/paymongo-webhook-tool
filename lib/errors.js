export default error => {
    const { response } = error;

    if (typeof response !== 'undefined') {
        console.log(response.data);

        if (response.status === 401) {
            return [
                {
                    message: 'Secret key required'
                }
            ]
        }

        const { errors } = response.data;

        if (typeof errors !== 'undefined') {
            return errors.map(({ detail }) => ({
                message: detail,
            }));
        }
    }

    return [
        {
            message: 'Something went wrong. Please contact us at devops@cynder.io.'
        }
    ];
}