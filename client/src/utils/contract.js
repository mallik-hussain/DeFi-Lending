import { ethers } from 'ethers';
import abi from './NFTRewards.json';

export const contractABI = abi.abi;
export const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getNFTContract = async (signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};