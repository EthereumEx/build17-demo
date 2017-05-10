pragma solidity ^0.4.8;

import "./Notification.sol";

contract Booking {

  /*
  * Reference id to party's internal system
  **/
  string public referenceId;

  /*
  * Buyer and seller addresses
  **/
  address public seller;
  address public buyer;

  /*
  * Buyer and seller prices
  **/
  uint public buyerPrice;
  uint public sellerPrice;

  /*
  * Notification contract on the chain
  **/
  Notification public notification;

  /*
  * Constructor taking the seller and buyer's address and a reference id
  **/
  function Booking(address _seller, address _buyer, string _referenceId, address _notificationAddress) {
    seller = _seller;
    buyer = _buyer;
    referenceId = _referenceId;
    notification = Notification(_notificationAddress);
  }

  /*
  * Update the booking price.
  * Only the register buyer and seller can call this function.
  **/
  function updateBooking(uint price) {
    // If the caller is not the buyer nor the seller, throw exception
    if (msg.sender != seller && msg.sender != buyer) {
      throw;
    }

    // If caller is seller then update the seller price
    if (msg.sender == seller) {
      sellerPrice = price;
    }
    // If the caller is buyer the update the buyer price
    else if (msg.sender == buyer) {
      buyerPrice = price;
    }

    notification.updateEvent(msg.sender);
  }

  /*
  * Get the contract state.
  * This function does not manipulate state therefore its marked constant.
  **/
  function contractState() constant returns (bool) {
    // Initialized state
    if (buyerPrice == 0 || sellerPrice == 0){
      return false;
    }
    // Agreed state
    if (buyerPrice == sellerPrice) {
      return true;
    }
    // Dispute
    else {
      return false;
    }
  }
}
