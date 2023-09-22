import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import { Typography, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PopularItem from "../components/PopularItem";
import List from "@mui/material/List";
import { CORE_EP, CORE_URL, fetcher } from "../config";
import Image from "next/image";
import NextLink from "next/link";
import Loader from "../components/Loader";

const theme = createTheme({
	components: {
		MuiTabs: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						color: "#000",
					},
					".MuiTab-textColorPrimary": {
						color: "#000",
						fontSize: "20px",
						padding: "0px",
						marginRight: "25px",
						textTransform: "capitalize",
					},
				},
				indicator: {
					height: "4px",
					backgroundColor: "#00b2ff",
				},
			},
		},
	},
});

const Home = () => {
	const [tab, setTab] = useState("1");
	const [file, setFile] = useState([]);
	const [randomMovie, setRandomMovie] = useState({});
	const [windowHeight, setWindowHeight] = useState(0);
	const [isLoading, setLoading] = useState(true);

	const tabChange = (event, newValue) => {
		setTab(newValue);
	};

	const getRandomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const getRandomMovie = () => {
		setRandomMovie(
			file[getRandomInt(0, file.length >= 100 ? 99 : file.length - 1)]
		);
	};

	useEffect(() => {
		setLoading(true);
		setWindowHeight(window.innerHeight);
		fetcher(
			CORE_EP.GET_MOST_POPULAR_MOVIES,
			"get",
			null,
			null,
			null,
			(res) => {
				console.log("Result: ***** ", res.data);
				setFile(res.data.items);
				setLoading(false);
			},
			(err) => {
				console.log(err);
				setLoading(false);
			}
		);
	}, []);

	useEffect(() => {
		if (file.length > 0) {
			getRandomMovie();
		}
	}, [file]);

	return (
		<Page title='Random'>
			<ThemeProvider theme={theme}>
				<Grid container sx={{ padding: "10px 30px" }}>
					<Typography variant='h4' sx={{ color: "#00b2ff", fontWeight: 600 }}>
						Random Movie Picker
					</Typography>
					<Box sx={{ width: "100%", typography: "body1" }}>
						<TabContext value={tab}>
							<Box>
								<TabList onChange={tabChange} aria-label='lab API tabs example'>
									<Tab label='random' value='1' />
									<Tab label='popular' value='2' />
								</TabList>
							</Box>
							{(isLoading && <Loader />) || (
								<>
									<TabPanel
										value='1'
										sx={{ paddingLeft: "70px", paddingRight: "70px" }}
									>
										<Button
											variant='contained'
											aria-label='pick'
											sx={{
												backgroundColor: "#00b2ff",
												borderRadius: "0px",
												marginBottom: "20px",
											}}
											onClick={() => {
												getRandomMovie();
											}}
										>
											PICK A RANDOM MOVIE
										</Button>
										<Grid container sx={{ marginBottom: "20px" }}>
											<Typography
												variant='h4'
												sx={{
													color: "#000",
													fontWeight: 700,
													marginRight: "20px",
												}}
											>
												{randomMovie?.title}
											</Typography>
											<Typography variant='h4' sx={{ color: "#000" }}>
												{randomMovie?.year}
											</Typography>
										</Grid>
										<NextLink
											href={`${CORE_URL.MOVIE_DETAIL}?movieId=${randomMovie?.id}`}
											passHref
										>
											<Image
												src={randomMovie?.image}
												alt='image'
												loading='lazy'
												layout='fixed'
												width={100}
												height={100}
												style={{
													cursor: "pointer",
													width: "100%",
													height: windowHeight - 300,
												}}
											/>
										</NextLink>
									</TabPanel>
									<TabPanel
										value='2'
										style={{
											paddingLeft: "70px",
											paddingRight: "70px",
											height: windowHeight - 200,
											overflowY: "auto",
										}}
									>
										<List
											sx={{
												width: "100%",
												bgcolor: "background.paper",
											}}
										>
											{file.map((item) => (
												<PopularItem key={item.id} item={item} />
											))}
										</List>
									</TabPanel>
								</>
							)}
						</TabContext>
					</Box>
				</Grid>
			</ThemeProvider>
		</Page>
	);
};

export default Home;
