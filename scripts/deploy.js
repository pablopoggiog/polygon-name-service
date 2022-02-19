const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const TLD = "zed";
  const domainContract = await domainContractFactory.deploy(TLD);
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("jors", {
    value: hre.ethers.utils.parseEther("0.3"),
  });
  await txn.wait();
  console.log(`Minted domain jors.${TLD}`);

  txn = await domainContract.setRecord("jors", `Am I a jors or a ${TLD}??`);
  await txn.wait();
  console.log(`Set record for jors.${TLD}`);

  const address = await domainContract.getAddress("jors");
  console.log("Owner of domain jors:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
