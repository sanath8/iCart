import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import * as allactions from './actions/actionCreators';
import Root from "./components/Router";
//provider makes the store available
function mapStateToProps(store){
    return {
        products: store.products,
        cart: store.cart,
        login: store.login,
        path: store.path,
        recommends: store.recommends
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators(allactions,dispatcher);
}

export var Main = connect(mapStateToProps,mapDispatchToProps)(Root);