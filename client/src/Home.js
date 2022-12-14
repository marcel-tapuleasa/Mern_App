import React from 'react';
import Nav from './Nav';
import styles from './index.module.css';

function Home() {

    return (
        <>
        <Nav/>
        <div className={styles.homepage}>
            <div className={styles.slogan}>
                <h1>This is the home component!!!</h1>
            </div>
        </div>
        </>
    )
}

export default Home;

