class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getData(name) {
        return fetch(`${this._url}${name}`, {
            headers: this._headers,
        });
    }

  
    _getResponseData(res) {
           if(res.ok) {
               return res.json();
           }
           return Promise.reject(new Error(`Ошибка: ${res.status}`));
       }
  

    getUserInfo() {
        return this.getData('users/me')
           .then(res => this._getResponseData(res));  
    }

    getInitialCards() {
       return this.getData('cards')
           .then(res => this._getResponseData(res));
        
    }

    getAllPageData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    saveEditedInfo(formData) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers:  this._headers,
            body: JSON.stringify({
                name: formData.name,
                about: formData.about
              })
        }).then(res => this._getResponseData(res));
    
    }

    addNewCard(item) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers:  this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link
              })
        }).then(res => this._getResponseData(res));
       
    }

    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked){
            return fetch(`${this._url}cards/likes/${cardId}`, {
                method: "PUT",
                headers: this._headers,
            }).then(res => this._getResponseData(res));
        } else {
            return fetch(`${this._url}cards/likes/${cardId}`, {
                method: "DELETE",
                headers:  this._headers
            }).then(res => this._getResponseData(res));
        }
    }

    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            method: "DELETE",
            headers:  this._headers
        }).then(res => this._getResponseData(res));
        
    }

    updateAvatar(formData) {
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers:  this._headers,
            body: JSON.stringify({
                avatar: formData.avatar,
              })
        }).then(res => this._getResponseData(res));
    }

}

const options = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-15/',
    headers: {
          authorization: '57f413af-09ac-4c6d-a557-b4a54c66383d',
          'Content-Type': 'application/json'
        }
    };

export const api = new Api(options);