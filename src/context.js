import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import SignUp from "../src/components/auth/SignUp"
import { useHistory } from "react-router-dom";
import fire from  '../src/components/fire';
import CartItem from "./components/Cart/CartItem";
import history from "./navigation/history"
const ProductContext = React.createContext();

// fb.database().ref('/')
//   .child('offers')
//   .orderByChild('email')
//   .equalTo('noma@gmail.com')
//   .once("value", function(snapshot) {
//     // // console.log(snapshot.val().key();

//     snapshot.forEach(function(data) {
//         // console.log(data.key);
//     });
// });

class ProductProvider extends Component {
  
  constructor(props)
  {
    super(props);
    this.signUp=this.signUp.bind(this)
    this.signIn=this.signIn.bind(this)
    this.toggleRider=this.toggleRider.bind(this)
  }
  

  state = {
    products: [],
    productsDup: [],
    // productsLive: [],
    categories: [],
    offers: [],
    productReviews: [],
    buyerOrders: [],
    orderDetails: [],
    categories: [],
    reviews: [],
    hire: [],
    deliveredOrders: [],
    hireNotifs: [],
    offerNotifs: [],
    hireCount: 0,
    offerCount: 0,
    detailProduct: detailProduct,
    reviewDetail: {
      "buyerId" : "SHVwr8W2YTZMazMHFDudldLtlJD2",
      "productId" : "-M4g6ifSMTQ5ZovvEBjZ",
      "productName" : "Ps5",
      "rating" : 5,
      "review" : "gud"
    },
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    currentScreen: 'products',
    isDrawerVisible: false,
    // isSeller: false,
    isSeller: false,
    uid: "uHrYlhp39KS7Bsl5FYsSQzm9m8x2",
    isRDetailsPopUp: false,
    user:null,
    userData: [],
    riders:[],
    complains:[],
    isRider:false
  };

componentWillUpdate(nextProps,nextState)
{
  localStorage.setItem("context-seller",JSON.stringify(nextState.isSeller));
  localStorage.setItem("context-rider",JSON.stringify(nextState.isRider));

}
  componentWillMount() {
    localStorage.getItem('context-seller') &&this.setState({
      isSeller:JSON.parse(localStorage.getItem('context-seller'))
    })
    localStorage.getItem('context-rider') &&this.setState({
      isRider:JSON.parse(localStorage.getItem('context-rider'))
    })
    // this.setProducts();
    // this.setOffers();
    // this.setProductReviews();
    // this.setProductOrders();
    // this.setState(function(prevState, props) {
    //   return {
    //     isRider: localStorage.getItem( 'isRider' )
    //   };
    // })
    fire.getFire().auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("USER +> " + user.uid)
        this.setDeliveredOrders();
        this.setState({user:user})
        this.setProducts();
        this.setOffers();
        this.setProductReviews();
        this.setReviews();
        this.setProductOrders();
        this.setSellerOrders();
        this.setUserData();
        this.setCategories();
        this.cartFetchDB();
        this.setHire();
        this.setNotifData();
        this.setComplains();
        this.setRiders();
        
        // this.setState(() => {
        //   return {
        //     user: user,
        //   };
        // });
        // User is signed in.
      } else {
        // No user is signed in.
      }
      // // console.log("what", this.state.user)
    }.bind(this));



    // fire.getFire().auth().signOut().then(function() {
    //   // Sign-out successful.
    // }).catch(function(error) {
    //   // An error happened.
    // });

  }

  setDeliveredOrders()
  { 
    fire.getFire().database().ref().child('orderDetails')
        .on('value',(childSnapshot) => {
           var orders = [];
          childSnapshot.forEach((doc) => {
              if(doc.toJSON().status==="delivered")
              {
                orders.push({
                  orderId:doc.toJSON().orderId
                });
              }
                })
                if(orders.length>0)
                {
                  this.setState(() => {
                    return { deliveredOrders: orders};
                  });
                }
                // products.push({
                //     id: doc.key,
                //     name: doc.toJSON().name,
                //     description: doc.toJSON().description,
                //     img: doc.toJSON().image,
                //     price: 10,
                //     // brand: doc.toJSON().brand,
                //     // category: doc.toJSON().category,
                //     // logo: doc.toJSON().logo
                // });
           
              });
    }
  setNotifData = () => {
    var fb=fire.getFire();
    var hires=[];

    fb.database().ref('/')
      .child('hire')
      .orderByChild('employeeId')
      .equalTo(this.state.user.uid)
      .on("value", function(snapshot) {
        hires = []
        snapshot.forEach((doc) => {
          var flag=true;
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false

              for(var k in this.state.deliveredOrders)
              {
                  if(this.state.deliveredOrders[k].orderId===doc.toJSON().orderId)
                  {
                    flag=false;
                  }
              }
              if(flag)
              hires.push(doc.toJSON());
              flag=true;
              
        });
        // console.log('hires ', hires.filter(function(el){ return el.state === 'REQUESTED' }).length)
        
        // console.log(this.state.hireNotifs)

        this.setState(() => {
          return { hireNotifs: hires,
                  hireCount: hires.filter(function(el){ return el.state === 'REQUESTED' }).length};
        });

         console.log(this.state.hireNotifs)

    }.bind(this));
    

    var offers=[];

    fb.database().ref('/')
      .child('offers')
      .orderByChild('buyerId')
      .equalTo(this.state.user.uid)
      .on("value", function(snapshot) {
        offers=[]
        snapshot.forEach((doc) => {
          
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
            
              offers.push(tempJSON);
        });
        // console.log('offers ', offers)
        // // console.log(productReviews)

        this.setState(() => {
          return { offerNotifs: offers,
                  offerCount: offers.filter(function(el){ return el.status === 'PENDING' }).length };
        });

    }.bind(this));
  
  }

cartFetchDB(){
  var cartList = [];
  var tempProdList = [];
  var isFirst = true;
  // // console.log('Cart Fetch')
  fire.getFire().database().ref('/')
    .child('cartWeb/'+this.state.user.uid)//+this.state.user.uid
    // .orderByChild('buyerId')
    // .equalTo(this.state.user.uid)
    .once("value", function(snapshot) {
      cartList = [];
      tempProdList = [];
      snapshot.forEach((doc) => {
        // // console.log(doc.key)
        var tempJSON = doc.toJSON()
        if (isFirst){
          for (var cart in tempJSON){
            cartList.push(tempJSON[cart])
          }
        } else {
          for (var cart in tempJSON){
            tempProdList.push(tempJSON[cart])
          }
        }
        var tempJSON = doc.toJSON()  
            // tempJSON['id'] = doc.key
        // // console.log(tempJSON)            
        // userData.push(tempJSON);
        isFirst = false;
      });


      // // console.log(offers)
      // // console.log(userData)

      this.setState(() => {
        return { product: tempProdList, cart: cartList };
      });

  }.bind(this));
}

toggleRider()
{
  this.setState(() => {
    return {
      isRider: this.state.isRider ? false : true,
    };
  }
  )
  
}
signIn(email,password)
{
  
  // // console.log("sign in", email, password);
  fire.getFire().auth().signInWithEmailAndPassword(email, password).then(
    user => {
      // // console.log("ewfew",user);
      
      this.setState(() => {
        return {
          user: user,
        };
      });
      fire.getFire().auth().onAuthStateChanged(user => {
        console.log("user",user)
        if(user.uid==="ilc1oP62GLZqm86rpyJcQQnAT6L2")
        {
          if(!this.state.isSeller){
            this.toggleAppMode();
          };//go to seller mode if user is admin
          if(this.state.isRider){
            this.toggleRider();
          };//turn off rider mode if it is on
        }
        else
        {
          if(this.state.isSeller){
            this.toggleAppMode();
          };//go to buyer mode if not admin
          if(this.state.isRider){
            this.toggleRider();
          };//turn off rider mode if it is on
          fire.getFire().database().ref().child("riders")
          .on("value", function(snapshot) {
            snapshot.forEach((doc) => {
              console.log(doc.key)
              if(doc.key===user.uid)
              {
                console.log("rider hai")
                this.toggleRider()//turn rider mode on
                return
              }
            });
    
          }.bind(this))
        }
        
      });
    }
  ).catch(error => {
    console.error("Error signing in with password and email", error);
  });
 
}


signUp(email,displayname,password,type)
{
console.log("jqqqqq: "+displayname)
  // user => {
  //   // // console.log("ewfew",user);
  // //  history.push('/products')

  // user.updateProfile({
  //   photoURL: image,
  //   displayName: displayname
  // }).then(function() {
  //   // Update successful.
  //   fb.auth().onAuthStateChanged(user => {
  //     console.log('user image updated!!!')
  //     console.log("user: " + user);
  //     fb.database().ref("users/"+user.uid).set(
  //       {
  //         displayName: user.displayName,
  //         credit: 0,
  //         email: user.email,
  //         image: user.photoURL,
  //       })
  //   });
    
  // }

  //const history = useHistory()
  // // console.log('bih ', email, displayname, password)
    var fb= fire.getFire();
    fb.auth().createUserWithEmailAndPassword(email, password).then(function() {
      // Update successful.
      fb.auth().onAuthStateChanged(user => {
        console.log("user: " + user);
        
        user.updateProfile({
          displayName: displayname
        }).then(function() {
          // Update successful.

          this.setState(() => {
            return {
              user: user,
            };
          }); 

          fb.auth().onAuthStateChanged(user => {
            console.log("user: " + user);
            fb.database().ref("users/"+user.uid).set(
              {
                displayName: user.displayName,
                email: user.email
              })
            if(type==="rider")
            {
              fb.database().ref("riders/"+user.uid).set(
                {
                  displayName: user.displayName,
                  email: user.email
                })
                this.toggleRider();
            }
          });

      }.bind(this));
      
    }).bind(this);

        // this.setState(() => {
        //   return {
        //     user: user,
        //   };
        // }); 
      }.bind(this)
    ).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ...
    });
    // this.storeInDatabase(email,displayname)
    // this.setState(() => {
    //   return {
    //     user: USER,
    //   };
    // });
   //this.props.setUser(user)

 }
  signOut = () => {
    fire.getFire().auth().signOut();
    this.setState({user:null,isRider:false} , () => {
    //   this.setState({
    //     reset:func
    //   
  },localStorage.setItem( 'isRider', false ))
    
  }
  setProducts = () => {
    var fb=fire.getFire();
        var products=[];
        // var productsLive = [];
        fb.database().ref().child('products')
        .on('value',(childSnapshot) => {
          products=[];  
          // productsLive = [];
          childSnapshot.forEach((doc) => {
              var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              tempJSON['inCart'] = false
              tempJSON['isLive'] = false
                products.push(tempJSON)
                // products.push({
                //     id: doc.key,
                //     name: doc.toJSON().name,
                //     description: doc.toJSON().description,
                //     img: doc.toJSON().image,
                //     price: 10,
                //     // brand: doc.toJSON().brand,
                //     // category: doc.toJSON().category,
                //     // logo: doc.toJSON().logo
                // });
            });
            this.setState(() => {
              return { products: products, 
                      productsDup: products,
                      detailProduct: products[0] };
            });
        });
  };
  setComplains = () => {
    var fb=fire.getFire();
        var complains=[];
        // var productsLive = [];
        fb.database().ref().child('complains')
        .on('value',(childSnapshot) => {
          complains=[];  
          // productsLive = [];
          childSnapshot.forEach((doc) => {
                complains.push({
                  message : doc.toJSON().message,
                  email: doc.toJSON().email
                })
                // products.push({
                //     id: doc.key,
                //     name: doc.toJSON().name,
                //     description: doc.toJSON().description,
                //     img: doc.toJSON().image,
                //     price: 10,
                //     // brand: doc.toJSON().brand,
                //     // category: doc.toJSON().category,
                //     // logo: doc.toJSON().logo
                // });
            });
            this.setState(() => {
              return { complains: complains };
            });
        });
  };
  setRiders = () => {
    var fb=fire.getFire();
        var riders=[];
        // var productsLive = [];
        fb.database().ref().child('riders')
        .on('value',(childSnapshot) => {
          riders=[];  
          // productsLive = [];
          childSnapshot.forEach((doc) => {
                riders.push({
                  email : doc.toJSON().email
                })
                // products.push({
                //     id: doc.key,
                //     name: doc.toJSON().name,
                //     description: doc.toJSON().description,
                //     img: doc.toJSON().image,
                //     price: 10,
                //     // brand: doc.toJSON().brand,
                //     // category: doc.toJSON().category,
                //     // logo: doc.toJSON().logo
                // });
            });
            this.setState(() => {
              return { riders: riders };
            });
        });
  };
  setCategories = () => {
    var fb=fire.getFire();
    var categories=[];

    fb.database().ref('/')
      .child('categories')
      .orderByChild('userId')
      .equalTo(this.state.user.uid)
      .on("value", function(snapshot) {
        categories=[];
        snapshot.forEach((doc) => {
          console.log(doc.toJSON())
          var tempJSON = doc.toJSON()
          tempJSON['id'] = doc.key            
          categories.push(tempJSON);
        });
        // // console.log(offers)
        // // console.log(this)
        this.setState(() => {
          return { categories: categories };
        });

    }.bind(this));

    // // console.log(this.state.offers);
  };

  setProductOrders = () => {
    var fb=fire.getFire();
    var buyerOrders=[];

    fb.database().ref('/')
      .child('orderDetails')
      .on("value", function(snapshot) {
        snapshot.forEach((doc) => {
          // console.log(doc.key)  
                    
          buyerOrders.push(doc.toJSON());
        
        });
        
        // // console.log(offers)
        // // console.log(this)
        this.setState(() => {
          return { buyerOrders: buyerOrders };
        },() => 
        {
          // for (var i = 0; i < this.state.buyerOrders.length; i++) {
          //   // use array[i] here
          //   console.log(this.state.buyerOrders[i])
          // }
        }
        );
        
    }.bind(this));
    
    
    //  console.log(this.state.buyerOrders[0].bill);
  };

  setSellerOrders = () => {
    var fb=fire.getFire();
    var buyerOrders=[];
    fb.database().ref('/')
      .child('orders')
      .on("value", function(snapshot) {
        buyerOrders=[];
         
        snapshot.forEach((doc) => {  
          buyerOrders.push(doc);
        });
        // // console.log(offers)
        // // console.log(this)
        this.setState(() => {
          return { orderDetails: buyerOrders };
        },()=>{console.log(this.state.orderDetails[0])});

    }.bind(this));

    // // console.log(this.state.offers);
  };

  setOffers = () => {
    var fb=fire.getFire();
    var offers=[];

    fb.database().ref('/')
      .child('offers')
      .orderByChild('buyerId')
      .equalTo(this.state.user.uid)
      .on("value", function(snapshot) {
        offers=[];
        snapshot.forEach((doc) => {
          // // console.log(doc.toJSON())            
          offers.push(doc.toJSON());
        });
        // // console.log(offers)
        // // console.log(this)
        this.setState(() => {
          return { offers: offers };
        });

    }.bind(this));

    // // console.log(this.state.offers);
  };

  setProductReviews = () => {
    var fb=fire.getFire();
    var productReviews=[];

    fb.database().ref('/')
      .child('productReviews')
      .orderByChild('buyerId')
      .equalTo(this.state.user.uid)
      .on("value", function(snapshot) {
        productReviews=[];
        snapshot.forEach((doc) => {
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
            
          productReviews.push(tempJSON);
        });
        // // console.log(offers)
        // // console.log(productReviews)

        this.setState(() => {
          return { productReviews: productReviews };
        });

    }.bind(this));

    // // console.log(this.state.offers);
  };

  setReviews = () => {
    var fb=fire.getFire();
    var productReviews=[];

    fb.database().ref('/')
      .child('reviews')
      .orderByChild('sellerId')
      .equalTo(this.state.user.uid)
      .on("value", function(snapshot) {
        productReviews=[];
        snapshot.forEach((doc) => {
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
            
          productReviews.push(tempJSON);
        });
        // // console.log(offers)
        // // console.log(productReviews)

        this.setState(() => {
          return { reviews: productReviews };
        });

    }.bind(this));

    // // console.log(this.state.offers);
  };
  extractData=(id)=>
  {
    
    for(var i=0;i<this.state.userData.length;i++)
    {

      if(this.state.userData[i].id===id)
      {
        return this.state.userData[i].displayName
      }
    }
  }

  setUserData = () => {
    var fb=fire.getFire();
    var userData=[];

    fb.database().ref('/')
      .child('users')
      // .orderByChild('buyerId')
      // .equalTo(this.state.user.uid)
      .once("value", function(snapshot) {
        userData=[];
        snapshot.forEach((doc) => {
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
          // console.log(tempJSON)            
          userData.push(tempJSON);
        });
        // // console.log(offers)
        // // console.log(userData)

        this.setState(() => {
          return { userData: userData };
        });

    }.bind(this));
  };

  setHire = () => {
    var fb=fire.getFire();
    var productReviews=[];

    fb.database().ref('/')
      .child('hire')
      .orderByChild('employerId')
      .equalTo(this.state.user.uid)
      .on("value", function(snapshot) {
        productReviews=[];
        snapshot.forEach((doc) => {
          
          // // console.log(doc.toJSON())
          var tempJSON = doc.toJSON()  
              tempJSON['id'] = doc.key
              // tempJSON['inCart'] = false
              
        
          productReviews.push(tempJSON);
        });
        // // console.log(offers)
        // // console.log(productReviews)

        this.setState(() => {
          return { hire: productReviews };
        });

    }.bind(this));
  }


  // getProductReviewsByProductId

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    // const product = this.getItem(id);
    // console.log('setting ', id.name)
    this.setState(() => {
      return { detailProduct: id };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;

    const price = product.price;
    product.total = price;

    fire.getFire().database()
      .ref("cartWeb/"+this.state.user.uid)
      // .push()
      .set(
        {
          product: tempProducts,
          cart: [...this.state.cart, product],
        })

    this.setState(
      () => {
        return { product: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true
      };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return {
        modalOpen: false
      };
    });
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;

    // console.log('consola ', product)

    this.setState(
      () => {
        return {
          cart: [...tempCart]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  deleteProduct = id => {
    console.log("here");
    fire.getFire().database().ref('products/' + id).remove();
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id != id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removeProduct = tempProducts[index];
    removeProduct.inCart = false;
    removeProduct.count = 0;
    removeProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    fire.getFire().database().ref('/')
    .child('cartWeb/'+this.state.user.uid)//+this.state.user.uid
    // .orderByChild('buyerId')
    // .equalTo(this.state.user.uid)
    .remove();

    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subtotal = 0;
    this.state.cart.map(item => (subtotal += item.total));
    const tempTax = subtotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subtotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subtotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  switchScreen = screen => {
    // let subtotal = 0;
    // this.state.cart.map(item => (subtotal += item.total));
    // const tempTax = subtotal * 0.1;
    // const tax = parseFloat(tempTax.toFixed(2));
    // const total = subtotal + tax;
    this.setState(() => {
      return {
        currentScreen: screen,
      };
    });
  };

  handleDrawerOpen = () => {
    this.setState(() => {
      return {
        isDrawerVisible: true,
      };
    });
  };

  handleDrawerClose = () => {
    this.setState(() => {
      return {
        isDrawerVisible: false,
      };
    });
  };
  toggleAppMode = () => {
    // console.log('TOGGLER')
    this.setState(() => {
      return {
        isSeller: this.state.isSeller ? false : true,
      };
    });
  };

  searchProducts = query => {
    // // console.log('nigger '+query.target.value)
    var newArray = this.state.productsDup.filter(function (el) {
      return el.name.toLowerCase().indexOf(query.target.value.toLowerCase()) !== -1
    });
    this.setState(() => {
      return {
        products: newArray,
      };
    });
  }

  handleRDetailClose = () => {
    // this.setState({open: false});
    this.setState(() => {
      return {
        isRDetailsPopUp: false,
      };
    });
  }

  getProduct = id => {
    if (this.state.products.length > 0){
      // console.log(this.state.products[0])
      // console.log(id)
      // console.log('getProduct ', this.state.products.filter(function (el) {
      //   return el.id === id
      // })[0]);

      return this.state.products.filter(function (el) {
        return el.id === id
      })[0]
    }
}

  handleRDetailToggle = (review) => {
    // setOpen(!open);
    // this.setState({open: !this.state.open});
    console.log("toggleed", review)
    this.setState(() => {
      return {
        isRDetailsPopUp: !this.state.isRDetailsPopUp,
        reviewDetail: review,
      };
    });
  }

  pushProductReview = review => {

    const reference = fire.getFire().database().ref(`/products/${this.state.detailProduct.id}/aggregateRating`);

    // // console.log('DOOBIE '+reference.value)

    var counter;
    reference.once('value').then(function(snapshot) {
      counter = snapshot.val() ;
      // ...
      return reference.transaction(reviewCount => {
        reviewCount.ratingValue = (((parseInt(reviewCount.ratingValue)*parseInt(reviewCount.reviewCount))+review[0])/
                                  (parseInt(reviewCount.reviewCount)+1)).toString()
        reviewCount.reviewCount = (parseInt(reviewCount.reviewCount)+1).toString()
        // // console.log('DOOBIE '+reviewCount.ratingValue, reviewCount.reviewCount);
        return reviewCount;
      });
    });

    // console.log('thissssss', this.state.user.uid)
    fire.getFire().database()
        .ref("productReviews")
        .push()
        .set(
          {
            buyerId: this.state.user.uid,
            // buyerEmail: this.state.buyerEmail,
            productId: this.state.detailProduct.id,
            productName: this.state.detailProduct.name,
            rating: review[0],
            review: review[1],
            // sellerId: this.props.products.userObj.uid 
          })
  }

  pushProductOffer = offer => {
    // console.log('thissssss', this.state.user.uid)
    fire.getFire().database()
        .ref("offers")
        .push()
        .set(
          {
            buyerId: this.state.user.uid,
            // buyerEmail: this.state.buyerEmail,
            productId: this.state.detailProduct.id,
            productName: this.state.detailProduct.name,
            price: offer,
            status: 'PENDING'
            // sellerId: this.props.products.userObj.uid 
          })
  }

  completeDelivery= (key) =>{
   // console.log(key)
    fire.getFire().database().ref("orderDetails/"+key).update(
      {
        status: 'delivered'
      });
      window.location.reload();
      }
  checkoutCart= (address, cnumber) =>{
    // console.log(...this.state.cart)
    var i;
    var d = new Date();
    var bill=0;
    var order= fire.getFire().database()
          .ref("orders")
          .push()
    for (var cartItem in this.state.cart){
      
      // console.log(this.state.cart[cartItem])
      for (i = 0; i < this.state.cart[cartItem].count; ++i){
        
          order.push().set(
            {
              bill: this.state.cart[cartItem].price,
              sellerId: this.state.cart[cartItem].sellerId, 
              product: this.state.cart[cartItem].id,
              // productList: pList,
            })
            bill=bill + this.state.cart[cartItem].price;
      }
    }
    fire.getFire().database().ref("orderDetails/"+order.key).set(
      {
        buyerId: this.state.user.uid,
        totalBill: bill,
        address: address,
        contactNumber: cnumber,
        createdAt: Math.round(d.getTime() / 1000),
        status: 'pending',
        orderId: order.key
      })
    this.clearCart();
  }
  submitComplain=(message,email)=>
  {
    console.log(message);
    fire.getFire().database()
          .ref("complains")
          .push()
          .set(
            {
              message: message,
              email:email
              // productList: pList,
            })
  }
getProduct=(key)=>{
for (var k in this.state.products)
{
  if(this.state.products[k].id===key)
    return this.state.products[k];
}
}
  render() {
    
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          completeDelivery: this.completeDelivery,
          getProduct: this.getProduct,
          extractData: this.extractData,
          submitComplain:this.submitComplain,
          getProduct: this.getProduct,
          pushProductOffer: this.pushProductOffer,
          pushProductReview: this.pushProductReview,
          signIn: this.signIn,
          signUp: this.signUp,
          storeInDatabase: this.storeInDatabase,
          signOut: this.signOut,
          handleRDetailClose: this.handleRDetailClose,
          handleRDetailToggle: this.handleRDetailToggle,
          searchProducts: this.searchProducts,
          toggleAppMode: this.toggleAppMode,
          handleDrawerClose: this.handleDrawerClose,
          handleDrawerOpen: this.handleDrawerOpen,
          switchScreen: this.switchScreen, // Register
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          checkoutCart: this.checkoutCart, 
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer, ProductContext };
