pragma solidity ^0.4.8;

contract Notification {
  event Update(address contractOrigin, address caller);

  function updateEvent(address caller) {
    Update(msg.sender, caller);
  }
}
