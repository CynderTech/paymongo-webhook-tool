export default error => {
    const { response } = error;

    console.log(response.data);

    if (response.status === 401) {
        return [
            {
                message: 'Secret key required'
            }
        ]
    }

    return [
        {
            message: 'Something went wrong. Please contact us at devops@cynder.io.'
        }
    ];
}