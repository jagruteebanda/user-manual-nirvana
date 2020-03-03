import React from 'react';
import {
	View,
	Text,
	Dimensions
} from 'react-native';
import {
	createAppContainer
} from 'react-navigation';
import {
	createDrawerNavigator
} from 'react-navigation-drawer';

import Splash from './app/components/Splash';
import Home from './app/components/Home';
import ScanProduct from './app/components/ScanProduct';
import ScanProductStep1 from './app/components/ScanProductStep1';
import ScanProductStep2 from './app/components/ScanProductStep2';
import ScanProductStep3 from './app/components/ScanProductStep3';
import SearchTasks from './app/components/SearchTasks';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.83;

const RouteConfigs = {
	Splash: {
		screen: Splash
	},
	Home: {
		screen: Home
	},
	ScanProduct: {
		screen: ScanProduct
	},
	ScanProductStep1: {
		screen: ScanProductStep1
	},
	ScanProductStep2: {
		screen: ScanProductStep2
	},
	ScanProductStep3: {
		screen: ScanProductStep3
	},
	SearchTasks: {
		screen: SearchTasks
	}
};

const DrawerNavigatorConfigs = {
	initialRouteName: 'Splash',
	drawerWidth: DRAWER_WIDTH,
	drawerPosition: "left",
	drawerType: "slide",
	edgeWidth: 30,
	drawerLockedMode: 'unlocked',
	contentOptions: {
		itemStyle: {
			height: 50
		},
		labelStyle: {
			fontSize: 16,
			fontFamily: 'Sahitya-Bold',
			fontWeight: 'normal'
		}
	},
	// contentComponent: (<CustomDrawerContentComponent />)
};

const DrawerNavigator = createDrawerNavigator(RouteConfigs, DrawerNavigatorConfigs);

export default createAppContainer(DrawerNavigator);