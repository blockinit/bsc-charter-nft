const { ethers, upgrades } = require('hardhat');
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');
const { expect } = require('chai');

const zeroAddress = '0x0000000000000000000000000000000000000000';

describe("BSCCharterNFT", async function () {

  it('will deploy implementation contract without issue', async () => {
    const BSCCharterNFT = await ethers.getContractFactory("BSCCharterNFT");
    await BSCCharterNFT.deploy();
  });

  it('will deploy an upgradeable proxy', async () => {
    const BSCCharterNFT = await ethers.getContractFactory("BSCCharterNFT");
    const proxyDeploy = await upgrades.deployProxy(BSCCharterNFT, { kind: 'uups' });
    const proxy = await proxyDeploy.deployed();
    const implAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
    
    expect(ethers.utils.isAddress(proxy.address)).to.be.true;
    expect(ethers.utils.isAddress(implAddress)).to.be.true;
    expect(proxy.address === zeroAddress).to.be.false;
    expect(implAddress === zeroAddress).to.be.false;
    expect(proxy.address === implAddress).to.be.false;
  });

  it('will upgrade implementation', async () => {

    // deploy proxy and implementation
    const BSCCharterNFT = await ethers.getContractFactory("BSCCharterNFT");
    const proxyDeploy = await upgrades.deployProxy(BSCCharterNFT, { kind: 'uups' });
    const proxy = await proxyDeploy.deployed();
    const initialImplAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
    expect(ethers.utils.isAddress(proxy.address)).to.be.true;
    expect(ethers.utils.isAddress(initialImplAddress)).to.be.true;
    expect(proxy.address === zeroAddress).to.be.false;
    expect(initialImplAddress === zeroAddress).to.be.false;
    expect(proxy.address === initialImplAddress).to.be.false;

    // upgrade the implementation
    const BSCCharterNFT2 = await ethers.getContractFactory("UpgradeImplementation");
    const upgraded = await upgrades.upgradeProxy(proxy.address, BSCCharterNFT2);
    await upgraded.deployed();
    const newImplAddress = await upgrades.erc1967.getImplementationAddress(proxy.address, { useDeployedImplementation: true });

    expect(ethers.utils.isAddress(upgraded.address)).to.be.true;
    expect(ethers.utils.isAddress(newImplAddress)).to.be.true;
    expect(initialImplAddress === newImplAddress, `implementation address hasn't changed. origin: ${initialImplAddress} new: ${newImplAddress}`).to.be.false;
  });
});
