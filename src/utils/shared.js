class SharedUtils{
    constructor(){
        this.length = 8;
        this.charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        this.retVal = "";
    }

    createDummyPasscode() {
        for (var i = 0, n = this.charset.length; i < this.length; ++i) {
            this.retVal += this.charset.charAt(Math.floor(Math.random() * n));
        }
        return this.retVal;
    }
}

export default SharedUtils;