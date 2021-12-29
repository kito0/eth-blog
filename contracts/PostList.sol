pragma solidity ^0.5.0;

contract PostList {
    uint public taskCount = 0;

    struct Post {
        uint id;
        string author;
        string body;
        bool completed;
    }

    mapping(uint => Post) public posts;

    constructor() public {
        createPost("Tester", "Test post");
    }

    function createPost(string memory _author, string memory _body) public {
        taskCount ++;
        posts[taskCount] = Post(taskCount, _author, _body, false);
    }
}
