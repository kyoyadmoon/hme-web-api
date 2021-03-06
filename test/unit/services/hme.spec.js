
describe("hme", () => {
  describe("with seriel port", () => {
    before(async done => {
      try {
        await services.hme.connectSerialPort();
        done();
      } catch (e) {
        done(e);
      }
    });


    it("serial Port connect", done => {

      try {
        services.hme.serialPortIsOpen.should.be.true;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port ping", async done => {

      try {
        let result = await services.hme.ping();
        result.should.be.not.null;
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port UartTxRx", async done => {

      try {
        let restComm = [128,1,0,0,0,0,0,50,1,0,0,0,0,0,1,0,0,53,1,0];
        let params = {
          Comm:restComm,
          RxLen:8
        }
        let result = await services.hme.UartTxRx(params);
        result.should.be.equal[ 192, 1, 0, 0, 50, 115, 1, 0 ];
        console.log('UartTxRx result',result);
        done();
      } catch (e) {
        done(e);
      }

    });

    it("serial Port SearchDevice", async done => {

      try {
        let result = await services.hme.SearchDevice();
        console.log('SearchDevice result',result);
        result.should.be.Array;
        result[0].should.have.any.keys('DevID', 'DevGroup');
        done();
      } catch (e) {
        done(e);
      }

    });

    it.only("serial Port TestDevice", async done => {

      try {
        let DevID = 1;
        let result = await services.hme.TestDevice(DevID);
        result.should.be.equal(DevID);
        done();
      } catch (e) {
        done(e);
      }

    });

    // it.only("SearchDevice", done => {
    //   try {
    //     let result = services.hme.SearchDevice();
    //     console.log(result);
    //     done();
    //   } catch (e) {
    //     done(e);
    //   }
    // });


  });

  describe("without seriel port", () => {

    it("WordTo3Byte", done => {
      try {
        let result = services.hme.encode.WordTo3Byte('aaabbcc');
        console.log(result);
        done();
      } catch (e) {
        done(e);
      }
    });

    it("u3ByteToWord", done => {
      try {
        let result = services.hme.encode.u3ByteToWord('aaabbcc');
        console.log(result);
        done();
      } catch (e) {
        done(e);
      }
    });


    it("ClientOp.CopBitInv", done => {
      try {
        //CopWordRd = function(u8DevID, GroupNum, u8FuncCT, u8DataNum, u8Addr_Arry)
        let params = {
          u8DevID:0xa55,
          GroupNum:0x00,
          sFunc:'BitInv',
          u8DataNum:2,
          u8Addr_Arry:[0xf125,0x123],
          u8DataIn_Arry:[],
          u8Mask_Arry:[0xffff,0xeeee],
          RepeatNum:1
        }
        let result = services.hme.encode.ClientOp(params);
        result[0].should.be.equal(128);
        result[1].should.be.equal(85);
        result[2].should.be.equal(20);
        result[3].should.be.equal(0);
        result[4].should.be.equal(0);
        result[5].should.be.equal(0);
        result[6].should.be.equal(0);
        result[7].should.be.equal(18);
        result[8].should.be.equal(2);
        result[9].should.be.equal(0);
        result[10].should.be.equal(0);
        result[11].should.be.equal(37);
        result[12].should.be.equal(98);
        result[13].should.be.equal(3);
        result[14].should.be.equal(35);
        result[15].should.be.equal(2);
        result[16].should.be.equal(0);
        result[17].should.be.equal(127);
        result[18].should.be.equal(127);
        result[19].should.be.equal(3);
        result[20].should.be.equal(110);
        result[21].should.be.equal(93);
        result[22].should.be.equal(3);
        result[23].should.be.equal(123);
        result[24].should.be.equal(6);
        result[25].should.be.equal(0);
        console.log(result);
        done();
      } catch (e) {
        done(e);
      }
    });

    it("RxDecode", done => {
      try {
        let testArry = [192, 1, 0, 0, 50, 115, 1, 0];
        let params = {
            FuncCT:50,
            DevID:1,
            u8RxDataArry:testArry
          };
        let result = services.hme.encode.RxDecode(params);
        console.log('RxDecode = ', result);
        done();
      } catch (e) {
        done(e);
      }
    });




  });



});
