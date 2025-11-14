class GMStorage {
    constructor(key = 'azgames.io_storage') {
        this.key = key;
        this.limit = 24;
        this.arrayFavoritesStorage = [];
        this.arrayLikesStorage = [];
        this.arrayDislikesStorage = [];
        this.arrayRecentStorage = [];
        this.load();
    }

    load = () => {
        try {
            const data = localStorage.getItem(this.key);
            if (data) {
                const parsed = JSON.parse(data);
                this.arrayFavoritesStorage = Array.isArray(parsed.arrayFavoritesStorage) ? parsed.arrayFavoritesStorage : [];
                this.arrayLikesStorage = Array.isArray(parsed.arrayLikesStorage) ? parsed.arrayLikesStorage : [];
                this.arrayDislikesStorage = Array.isArray(parsed.arrayDislikesStorage) ? parsed.arrayDislikesStorage : [];
                this.arrayRecentStorage = Array.isArray(parsed.arrayRecentStorage) ? parsed.arrayRecentStorage : [];
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
			localStorage.removeItem(this.key);
        }
        return this;
    }

    save = () => {
        try {
            localStorage.setItem(this.key, JSON.stringify({
                arrayFavoritesStorage: this.arrayFavoritesStorage,
                arrayLikesStorage: this.arrayLikesStorage,
                arrayDislikesStorage: this.arrayDislikesStorage,
                arrayRecentStorage: this.arrayRecentStorage
            }));
        } catch (error) {
            //console.error('Failed to save to localStorage:', error);
        }
    }

    get = () => {
        return localStorage.getItem(this.key) || null;
    }

    clear = () => {
        localStorage.removeItem(this.key);
        this.arrayFavoritesStorage = [];
        this.arrayLikesStorage = [];
        this.arrayDislikesStorage = [];
        this.arrayRecentStorage = [];
    }

    // Generic method for adding to capped arrays (favorites, likes, recent)
    addToArray = (array, objgame, save = true) => {
        if (!objgame || typeof objgame.slug !== 'string') {
            console.error('Invalid game object or slug');
            return;
        }
        // Remove existing game with the same slug (if any)
        const updatedArray = array.filter(item => item.slug !== objgame.slug);
        // Add the new game object
        updatedArray.push(objgame);
        // Enforce the limit by removing the oldest item if necessary
        if (updatedArray.length > this.limit) {
            updatedArray.shift();
        }
        // Update the original array
        array.length = 0;
        array.push(...updatedArray);
        if (save) this.save();
    }

    // Generic method for removing from arrays
    removeFromArray = (array, game_slug, save = true) => {
        if (typeof game_slug !== 'string') {
            console.error('Invalid game slug');
            return;
        }
        const index = array.findIndex(item => item.slug === game_slug);
        if (index !== -1) {
            array.splice(index, 1);
            if (save) this.save();
        }
    }

    // Generic method to check if a game exists in an array
    hasGame = (array, game_slug) => {
        return array.some(item => item.slug === game_slug);
    }

    // Favorites
    addFavoritesGame = (objgame) => {
        this.addToArray(this.arrayFavoritesStorage, objgame);
    }

    removeFavoritesGame = (game_slug) => {
        this.removeFromArray(this.arrayFavoritesStorage, game_slug);
    }

    hasFavoritesGame = (game_slug) => {
        return this.hasGame(this.arrayFavoritesStorage, game_slug);
    }

    // Likes
    addLikeGame = (objgame) => {
        this.addToArray(this.arrayLikesStorage, objgame);
    }

    removeLikeGame = (game_slug) => {
        this.removeFromArray(this.arrayLikesStorage, game_slug);
    }

    hasLikeGame = (game_slug) => {
        return this.hasGame(this.arrayLikesStorage, game_slug);
    }

    // Dislikes
    addDislikeGame = (objgame) => {
        this.addToArray(this.arrayDislikesStorage, objgame);
    }

    removeDislikeGame = (game_slug) => {
        this.removeFromArray(this.arrayDislikesStorage, game_slug);
    }

    hasDislikeGame = (game_slug) => {
        return this.hasGame(this.arrayDislikesStorage, game_slug);
    }

    // Recent
    addRecentGame = (objgame) => {
        if (!objgame || typeof objgame.slug !== 'string') {
            console.error('Invalid game object or slug');
            return;
        }
        // Remove existing entry to avoid duplicates
        this.arrayRecentStorage = this.arrayRecentStorage.filter(item => item.slug !== objgame.slug);
        this.addToArray(this.arrayRecentStorage, objgame);
    }

    removeRecentGame = (game_slug) => {
        this.removeFromArray(this.arrayRecentStorage, game_slug);
    }

    hasRecentGame = (game_slug) => {
        return this.hasGame(this.arrayRecentStorage, game_slug);
    }
}