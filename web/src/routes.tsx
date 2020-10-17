import React from 'react';
// In the version 17.0 from React we won't need to import react here anymore
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

const Routes = () => {
    return (

    <BrowserRouter>
        {/* Here we put every single page of the application, the React Router Dom always compares the paths, so we need to put an exact ou the '/' because will make comparison of equality */}
        <Switch>
            {/* Only one page will be loaded at time when we use Switch */}
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />

            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
        </Switch>
        
    </BrowserRouter>
    );
}


export default Routes; 