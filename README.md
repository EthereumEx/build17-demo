# Microsoft Build 17 Blockchain Demo

This is the demo for Webjet Code Stroy talk at Build 2017. You can find the session recording [here](https://channel9.msdn.com/Events/Build/2017/T6979).
## Usage

### Clone this repo
```bash
git clone https://github.com/EthereumEx/build17-demo
```

### Dependencies
* [Docker](https://docs.docker.com/engine/installation/)
* Make sure you both `docker` and `docker-compose` are installed.


### Building the demo
Navigate to the `build17-demo` folder and run the following commands:

```bash
docker-compose run geth init /root/.ethereum/genesis.json
docker-compose up
```

Then you need to wait for `Geth` to generate the DAG and start making blocks. This process may take a couple of minutes. `🔨 mined potential block` means that `Geth` is ready and it is making blocks. Do not terminate this program while you're running the demo.

Now open a new terminal window to to build the demo application by:

```bash
cd build17-demo/src
docker build --network host -t demo .
```

### Running the Demo
For this part you'll need 3 terminal windows for `Buyer`, `Seller`, `Observer` (observer is optional). Run each of the following commands in a seperate terminal.

#### Buyer terminal

```bash
docker run -it \
  --net=host \
  -e ADDRESS_ME="0x9da7335f89ddf43516010efd6dd8ca5cbd0121d2" \
  -e PASSWORD_ME="" \
  -e OTHER="0xfbf805b1a872ea943ea82edff928d7842bcdd7fd" \
  -e ROLE="buyer" \
  demo
```
 
#### Seller Terminal
 
```bash
docker run -it \
  --net=host \
  -e ADDRESS_ME="0xfbf805b1a872ea943ea82edff928d7842bcdd7fd" \
  -e PASSWORD_ME="" \
  -e OTHER="0x9da7335f89ddf43516010efd6dd8ca5cbd0121d2" \
  -e ROLE="seller" \
  demo
```

#### Observer termianl
```bash
docker run -it \
  --net=host \
  demo
```

You are ready to do some booking using blockchain. Pick a random `Reference ID` and `Price` on the buyer termianl, and interact with that contract on the seller terminal. If you like to see how I use this demo in my talk [here is the link](https://channel9.msdn.com/Events/Build/2017/T6979).


## [Potential Bugs](https://github.com/EthereumEx/build17-demo/issues)
## [To do](https://github.com/EthereumEx/build17-demo/milestones)
## License
[MIT license](http://opensource.org/licenses/MIT)