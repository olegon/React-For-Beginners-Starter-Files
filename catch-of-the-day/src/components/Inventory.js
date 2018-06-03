import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';


import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import LogIn from './LogIn';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
    static propTypes = {
        addFish: PropTypes.func.isRequired,
        loadSampleFishes: PropTypes.func.isRequired,
        fishes: PropTypes.object.isRequired,
    }

    state = {
        uid: null,
        owner: null
    }

    authHandler = async (authData) => {
        const { storeId } = this.props;
        const { uid } = authData.user;
        const store = await base.fetch(storeId, { context: this });

        if (!store.owner) {
            await base.post(`${storeId}/owner`, {
                data: uid
            });
        }

        this.setState({
            uid: uid,
            owner: store.owner || uid
        });

        console.log(store);
        console.log(authData);
    }

    authenticate = (provider) => {
        const authProveider = new firebase.auth.FacebookAuthProvider();

        firebaseApp
            .auth()
            .signInWithPopup(authProveider)
            .then(this.authHandler);
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({
            uid: null,
            owner: null
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    render() {
        const { addFish, updateFish, deleteFish, loadSampleFishes, fishes } = this.props;
        const { uid, owner } = this.state;
        const logout = <button onClick={this.logout}>Logout</button>;

        if (uid == null) {
            return <LogIn authenticate={this.authenticate} />;
        }

        if (uid !== owner) {
            return (
                <div>
                    <p>Sorry, but you're not the owner.</p>
                    <div>
                        {logout}
                    </div>
                </div>
            );
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                <div>
                    {logout}
                </div>
                {
                    Object.entries(fishes).map(([fishId, fish]) =>
                        <EditFishForm
                            key={fishId}
                            fishId={fishId}
                            fish={fish}
                            updateFish={updateFish}
                            deleteFish={deleteFish} />
                    )
                }

                <AddFishForm addFish={addFish} />

                <button onClick={loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;
