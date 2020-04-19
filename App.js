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
import SSOLogin from './app/components/SSOLogin';
import Login from './app/components/Login';
import Home from './app/components/Home';
// import ScanProduct from './app/components/ScanProduct-temp';
import SelectModality from './app/components/ScanProduct/SelectModality'; // step 1
import AddProductPart from './app/components/ScanProduct/AddProductPart'; // step 2
import ScanProduct from './app/components/ScanProduct/ScanProduct'; // step 3
import PDFViewScreen from './app/components/ScanProduct/PDFViewScreen'; // step 4
import ActivityListView from './app/components/ScanProduct/ActivityListView'; // step 5
import TaskListView from './app/components/ScanProduct/TaskListView'; // step 6
import HTMLViewScreen from './app/components/ScanProduct/HTMLViewScreen'; // step 6
import TaskDataView from './app/components/ScanProduct/TaskDataView'; // step 7
import SearchTasks from './app/components/SearchTasks';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.83;

const RouteConfigs = {
	Splash: {
		screen: Splash
	},
	SSOLogin: {
		screen: SSOLogin
	},
	Login: {
		screen: Login
	},
	Home: {
		screen: Home
	},
	// ScanProduct: {
	// 	screen: ScanProduct
	// },
	SelectModality: {
		screen: SelectModality
	},
	AddProductPart: {
		screen: AddProductPart
	},
	ScanProduct: {
		screen: ScanProduct
	},
	PDFViewScreen: {
		screen: PDFViewScreen
	},
	ActivityListView: {
		screen: ActivityListView
	},
	TaskListView :{
		screen: TaskListView
	},
	HTMLViewScreen: {
		screen: HTMLViewScreen
	},
	TaskDataView: {
		screen: TaskDataView
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