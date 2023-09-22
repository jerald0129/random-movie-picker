import PropTypes from "prop-types";
import { Typography, Grid } from "@mui/material";
import Image from "next/image";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import NextLink from "next/link";
import { CORE_URL } from "../config";

const PopularItem = ({ item }) => {
	return (
		<ListItem
			alignItems='flex-start'
			sx={{
				borderBottom: "1px solid lightgrey",
				alignItems: "center",
				columnGap: "30px",
				paddingBottom: "20px",
				paddingTop: "20px",
			}}
		>
			<NextLink
				href={`${CORE_URL.MOVIE_DETAIL}?movieId=${item?.id}`}
				passHref
				style={{
					textDecoration: "none",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Image
					src={item.image}
					alt='image'
					loading='lazy'
					layout='fixed'
					width={220}
					height={100}
					style={{ cursor: "pointer" }}
					onClick={() => {
						console.log(item.id);
					}}
				/>
			</NextLink>
			<Grid container flex flexDirection='row' sx={{ height: "100%" }}>
				<Grid
					item
					md={4}
					sx={{
						height: "100%",
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<Grid>
						<Typography
							variant='h4'
							sx={{
								color: "#000",
								fontWeight: 700,
								marginRight: "20px",
								cursor: "pointer",
							}}
							onClick={() => {
								console.log(item.id);
							}}
						>
							{item.title}
						</Typography>
						<Typography variant='h4' color='text.primary'>
							{item.year}
						</Typography>
					</Grid>
				</Grid>
				<Grid
					item
					md={4}
					sx={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "column",
					}}
				>
					<Typography variant='h5' sx={{ color: "#000", fontWeight: 600 }}>
						IMDB RATING
					</Typography>
					<Grid
						container
						sx={{
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "row",
						}}
					>
						<FontAwesomeIcon
							icon={faStar}
							style={{
								color: "#00b2ff",
								fontSize: "25px",
								marginRight: "20px",
							}}
						/>
						<Typography
							variant='h4'
							color='text.primary'
							sx={{ fontWeight: 700 }}
						>
							{item.imDbRating} / {item.imDbRatingCount}
						</Typography>
					</Grid>
				</Grid>
				<Grid
					item
					md={4}
					justifyContent='space-between'
					sx={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "column",
					}}
				>
					<Grid>
						<Typography variant='h5' sx={{ color: "#000", fontWeight: 600 }}>
							Rank
						</Typography>
						<Typography
							variant='h4'
							color='text.primary'
							sx={{ fontWeight: 700 }}
						>
							{item.rank}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</ListItem>
	);
};

PopularItem.propTypes = {};

export default PopularItem;
