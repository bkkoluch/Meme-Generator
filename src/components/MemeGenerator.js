import React from 'react';

class MemeGenerator extends React.Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			randomImg: 'http://i.imgflip.com/1bij.jpg',
			allMemeImgs: [],
		};
	}

	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
			.then(response => response.json())
			.then(response => {
				const { memes } = response.data;
				this.setState({ allMemeImgs: memes });
			});
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
		const randomMeme = this.state.allMemeImgs[randomNum].url;
		this.setState({
			randomImg: randomMeme,
		});
	};

	render() {
		return (
			<div className='memeGeneratorContainer'>
				<div className='memeGeneratorContainer--meme'>
					<img src={this.state.randomImg} alt='' />
					<h2 className='top'>{this.state.topText}</h2>
					<h2 className='bottom'>{this.state.bottomText}</h2>
				</div>
				<form className='memeGeneratorContainer_form' onSubmit={this.handleSubmit}>
					<div className='formInputContainer'>
						<input
							type='text'
							name='topText'
							placeholder='Top Text'
							value={this.state.topText}
							onChange={this.handleChange}
						/>
						<input
							type='text'
							name='bottomText'
							placeholder='Bottom Text'
							value={this.state.bottomText}
							onChange={this.handleChange}
						/>
						<button>Generate</button>
					</div>
				</form>
			</div>
		);
	}
}

export default MemeGenerator;
