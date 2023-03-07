export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 1 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
}

export function getRandom(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len) throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export const getNumberSuffix = (value, decimals = 2) => {
    if (typeof value !== 'number') throw new Error('Value must be a number');

    if (isNaN(value)) return '0';

    switch (true) {
        case value === Infinity:
            return value;
        case value >= 1000000000000:
            return `${(value / 1000000000000).toFixed(2)}T `;
        case value >= 1000000000:
            return `${(value / 1000000000).toFixed(2)}B `;
        case value >= 1000000:
            return `${(value / 1000000).toFixed(2)}M `;
        case value >= 1000:
            return `${(value / 1000).toFixed(decimals)}K `;
        default:
            return value.toFixed(decimals);
    }
};

export const hasError = (errors, field) => {
    if (!errors || errors.length < 1) return false;

    let err = null;
    for (const key in errors) {
        if (errors[key].errorType !== field) continue;

        err = errors[key];
        break;
    }

    if (!err) return false;

    return err.errorMessage;
};

export const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
});

export const formatterFloat = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
});

export const makeReleaseDateString = (param) => {
    if (!param) return;
    const splitArray = [];

    splitArray.push(
        Math.floor(+param / 86400)
            .toString()
            .padStart(2, '0')
    );
    param = +param % 86400;
    splitArray.push(
        Math.floor(+param / 3600)
            .toString()
            .padStart(2, '0')
    );
    param = param % 3600;
    splitArray.push(
        Math.floor(+param / 60)
            .toString()
            .padStart(2, '0')
    );
    splitArray.push(
        Math.floor(+param % 60)
            .toString()
            .padStart(2, '0')
    );

    return splitArray.join('_');
};

export const parseDateString = (param) => {
    if (!param || typeof param !== 'string') return;
    const array = param.split('-');
    if (!array || array.length !== 4) return;

    let result = 0;
    if (!isNaN(+array[0])) result += +array[0] * 86400;
    if (!isNaN(+array[1])) result += +array[1] * 3600;
    if (!isNaN(+array[2])) result += +array[2] * 60;
    if (!isNaN(+array[3])) result += +array[3];

    return result;
};

export const parseMetamaskError = (msg) => {
    let startPos = msg.indexOf(`"originalError":`);
    if (startPos === -1) return msg;
    startPos += `"originalError":`.length;

    let endPos = msg.indexOf(`"}`, startPos);
    if (endPos === -1) return msg;
    endPos += `"}`.length;

    let originError = msg.substring(startPos, endPos);
    originError = JSON.parse(originError);

    return originError.message ?? msg;
};

export const getChangedFields = (origin, changed) => {
    let result = null;

    const swapA = JSON.parse(JSON.stringify(origin));
    const swapB = JSON.parse(JSON.stringify(changed));
    let isChanged = false;

    for (const property in swapA) {
        if (property === 'whitelistedUsersModifiedAt') continue;
        if (swapA[property] === swapB[property] && property !== 'rounds') continue;

        if (property === 'rounds') {
            const changedRounds = swapB['rounds'].filter((ele) => ele.startsAt || ele.endsAt);
            if (changedRounds.length === 0) continue;

            if (swapA['rounds'].length === swapB['rounds'].length) {
                isChanged = false;
                for (const idx in swapA['rounds']) {
                    isChanged =
                        swapA['rounds'][idx].startsAt !== swapB['rounds'][idx].startsAt ||
                        swapA['rounds'][idx].endsAt !== swapB['rounds'][idx].endsAt;
                    if (isChanged) break;
                }

                if (!isChanged) continue;
            }
        } else if (
            property === 'restrictedCountries' &&
            swapA.restrictedCountries.length === swapB.restrictedCountries.length
        ) {
            let searchCountry;
            const compareResult = swapA.restrictedCountries.map((restrict) => {
                searchCountry = swapB.restrictedCountries.find((country) => country === restrict);
                return searchCountry;
            });

            if (compareResult.length === swapB.restrictedCountries.length) continue;
        } else if (property === 'availableSpots') {
            let compareResult = [];
            for (const spot of swapA.availableSpots) {
                const temp = swapB.availableSpots.filter(
                    (item) => item.membershipTierId === spot.membershipTierId && +item.spots === +spot.spots
                );
                if (temp.length > 0) compareResult.push(spot);
            }

            if (compareResult.length === swapB.availableSpots.length) continue;
        }

        if (result === null) result = {};
        result[property] = swapB[property];
    }

    return result;
};

export const convertGuidToBytes16 = (guidStr) => {
    if (guidStr === '0') return '0x00000000000000000000000000000000';
    // convert guid string to 16 byte array
    var bytes = [];
    guidStr.split('-').map((number, index) => {
        var bytesInChar = index < 3 ? number.match(/.{1,2}/g).reverse() : number.match(/.{1,2}/g);
        bytesInChar.map((byte) => {
            bytes.push(parseInt(byte, 16));
            return '';
        });

        return '';
    });

    const hexString = Array.from(bytes, function (byte) {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('');

    return `0x${hexString}`;
};

export const formatUTC = (dateInt, addOffset = false) => {
    if (!dateInt || dateInt.length < 1) return null;

    let date = new Date(dateInt);
    if (typeof dateInt === 'string') {
        return date;
    } else {
        const offset = addOffset ? date.getTimezoneOffset() : -date.getTimezoneOffset();
        const offsetDate = new Date();
        offsetDate.setTime(date.getTime() + offset * 60000);
        return offsetDate;
    }
};

export const getShortenedAddress = (address) => {
    const is0x = (addr) => addr?.startsWith('0x');
    return `${address?.substring(0, is0x(address) ? 6 : 3)}...${address?.substr(
        address.length - (is0x(address) ? 4 : 3)
    )}`;
};
