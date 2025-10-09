// Auth's API
export const REGISTER_USER="auth/register"
export const LOGIN_USER="auth/login"
export const LOGOUT="auth/logout"
export const  FORGOT_PASSWORD="auth/forgot-password"
export const ME="auth/user"
export const UPDATE_USER="auth/update-user"
export const RESET_PASSWORD="auth/reset-password"

// Song's API
export const UPLOAD_SONG="song/song/create"
export const UPDATE_SONG="song/updateSong"
export const GET_ALL_SONG="song/allSong"
export const AUTHOR_ALL_SONG="song/author"
export const SONG_BY_ID="song/songById"
export const SONG_BY_NAME="song/song"
export const SONG_BY_TITLE="song/songs/search"
export const UPDATE_LIKE="song/update-like"
export const UPDATE_LISTEN_COUNT="song/update-listen-number"
export const DELETE_SONG="song/deleteSong"



// Product's API
export const UPLOAD_PRODUCT="products/upload/product"
export const GET_ALL_PRODUCT="products"
export const PRODUCT_BY_ID="products/product"
export const UPDATE_PRODUCT="products/update-product"
export const DELETE_PRODUCT="products/delete-product"

// Cart's API
export const CART_ADD="cart/add"
export const CART_GET="cart/items"
export const CART_UPDATE="cart/update"
export const CART_REMOVE="cart/remove"
export const CART_CLEAR="cart/clear"
export const CART_COUNT="cart/count"

// Payment's API
export const CREATE_PAYMENT_INTENT="payment/payment-intent"
export const CONFIRM_PAYMENT="payment/payment-confirm"
export const GET_PAYMENT_HISTORY="payment/payment-history"
export const CREATE_SUBSCRIPTION="payment/payment-subscription"
export const CANCEL_SUBSCRIPTION="payment/cancel-subscription"
export const AVAILABLE_GETWAYS="payment/payment-gateways"


// Review API
export const GET_REVIEWS="product/reviews"
export const ADD_REVIEWS="product/add-review"


// QNA API
export const GET_QNA="product/qna"
export const ADD_QNA="product/add-qna"


// Album API
export const CREATE_ALBUM="album/add-album"
export const GET_ALBUM_SONGS="album/getAlbum-songs"
export const GET_ALBUM="album/getAlbums"