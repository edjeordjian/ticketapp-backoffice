const getHeader = (token) => {
  return{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  }
}

const REQUEST_ERR_LBL = "No pudo realizarse la acción solicitada";

const postTo = (url, body, token = "") => {
    return fetch(url, {
            method: "POST",
            headers: getHeader(token),
            body: JSON.stringify(body)
        }
    ).then(response =>
        response.json()
    ).catch(error => {
        console.log(error);

        return {
            error: REQUEST_ERR_LBL
        };
    } );
};

const getTo = (url, token) => {
    return fetch(url, {
            method: "GET",
            headers: getHeader(token)
        }
    ).then(response =>
        response.json()
    ).catch(error => {
        console.log(error);

        return {
            error: REQUEST_ERR_LBL
        };
    } );
};

export {
    postTo, getTo
};
