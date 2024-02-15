export const isLikedByReqUser = (reqUserId, posts) => {

    for (let user of posts.liked) {
        if (reqUserId === user.id) {
            return true;
        }
    }

    return false;

}

export const isFollowedByReqUser = (authUsers, users) => {

    for (let id of authUsers.followings) {

        if (id === users.id) {
            return true;
        }

    }


    return false;

}