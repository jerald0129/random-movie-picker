import React, { useEffect, useState } from "react";
import Page from "../components/Page";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { CORE_EP, CORE_URL, fetcher } from "../config";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Loader from "../components/Loader";

export default function Home() {
	const router = useRouter();
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState({});
	const [isLoading, setLoading] = useState(true);

	const [windowHeight, setWindowHeight] = useState(0);

	useEffect(() => {
		setLoading(true);
		setWindowHeight(window.innerHeight);
		console.log(router.query.movieId);
		fetcher(
			CORE_EP.MOVIE_DETAIL.replace("{id}", router.query.movieId),
			"get",
			null,
			null,
			null,
			(res) => {
				console.log("Result: ***** ", res.data);
				setMovie(res.data);
				setLoading(false);
			},
			(err) => {
				console.log(err);
				setLoading(false);
			}
		);
	}, [router.query.id]);

	return (
		<Page title='Random'>
			<Grid container sx={{ padding: "10px 30px" }}>
				<NextLink
					href={CORE_URL.POPULAR_MOVIES}
					passHref
					style={{
						textDecoration: "none",
						display: "flex",
						alignItems: "center",
						marginBottom: '20px'
					}}
				>
					<Image
						src='/assets/back.png'
						alt='image'
						loading='lazy'
						layout='fixed'
						width={40}
						height={40}
						style={{
							cursor: "pointer",
						}}
					/>
					<Typography
						variant='h5'
						sx={{ textDecoration: "none", color: "#000", fontWeight: 600 }}
					>
						BACK
					</Typography>
				</NextLink>
				{(isLoading && <Loader />) || (
					<Grid container sx={{ padding: "0px 150px" }}>
						<Grid container sx={{ marginBottom: "10px" }}>
							<Typography
								variant='h4'
								sx={{
									color: "#000",
									fontWeight: 700,
									marginRight: "20px",
								}}
							>
								{movie?.title}
							</Typography>
							<Typography variant='h4' sx={{ color: "#000" }}>
								{movie?.year}
							</Typography>
						</Grid>
						<iframe
							width={500}
							height={windowHeight - 300}
							src={movie.videoUrl}
							style={{ width: "100%" }}
						></iframe>
						<Grid
							container
							sx={{
								gap: "20px",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								marginTop: "30px",
							}}
						>
							<Button
								variant='outlined'
								sx={{
									borderRadius: "0px",
									color: "#000",
									borderColor: "lightgrey",
									fontWeight: 600,
								}}
							>
								CRIME
							</Button>
							<Button
								variant='outlined'
								sx={{
									borderRadius: "0px",
									color: "#000",
									borderColor: "lightgrey",
									fontWeight: 600,
								}}
							>
								DRAMA
							</Button>
							<Button
								variant='outlined'
								sx={{
									borderRadius: "0px",
									color: "#000",
									borderColor: "lightgrey",
									fontWeight: 600,
								}}
							>
								THRILLER
							</Button>
							<Grid item>
								<Typography
									variant='body'
									sx={{ color: "#000", fontSize: "18px", fontWeight: 600 }}
								>
									A mentally troubled stand-up comedian embarks on a downward
									spiral that leads to the creation of an iconic villain.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</Page>
	);
}
