// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PostList {
    uint public postCount = 0;

    struct Post {
        uint id;
        string author;
        string body;
    }

    mapping(uint => Post) public posts;
    // Post[] posts;

    // constructor() public {
    //     createPost("Tester", "Test post");
    // }

    function createPost(string memory _author, string memory _body) public {
        postCount ++;
        posts[postCount] = Post(postCount, _author, _body);
    }

    function getPostCount() public view returns (uint) {
        return postCount;
    }

    function getPosts() public view returns (Post[] memory) {
        Post[] memory list = new Post[](postCount);
        for(uint i = 0; i < postCount; i++) {
            list[i] = posts[i];
        }
        return list;
    }
}
