const Governance = artifacts.require("./Governance.sol");

contract("Governance", (accounts) => {
    let governanceInstance;
    let address;

    beforeEach("Access deployed contract", async () => {
        // Access deployed contract
        governanceInstance = await Governance.deployed();
    });

    it("Sample Test", async () => {
        try {
            // Remove this line and write test
            assert.isTrue(true, "Didn't pass")
        } catch (err) {
            assert.isTrue(false, err.toString())
        }
    });


});
