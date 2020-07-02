const TolongURL = async () => {
    window.location.href =
        "https://utore.herokuapp.com/" + window.location.pathname.substr(1);
};
export default TolongURL;
