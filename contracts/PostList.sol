pragma solidity >=0.4.21 <0.7.0;

contract PostList {
    uint public postCount = 0;

    struct post {
        uint id;
        string author;
        string body;
    }

    mapping(uint => post) public posts;

    // constructor() public {
    //     createPost("Tester", "Test post");
    // }

    function createPost(string memory _author, string memory _body) public {
        postCount ++;
        posts[postCount] = post(postCount, _author, _body);
    }
}
