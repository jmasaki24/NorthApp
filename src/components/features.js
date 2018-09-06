//This file really only test out the work I put into ButtonImage.js
import React from 'react';
import { Card, CardSection, ButtonImage } from './common';

const Features = () => {
    return (
      <Card>
        <CardSection>
          <ButtonImage
            uri="https://openclipart.org/image/2400px/svg_to_png/297225/publicdomainq-ball.png"
            buttonText="Soccer"
          />
        </CardSection>
        <CardSection>
          <ButtonImage
            uri="https://openclipart.org/image/2400px/svg_to_png/297225/publicdomainq-ball.png"
          />
        </CardSection>
        <CardSection>
          <ButtonImage
            uri="http://suttersmillsuffern.com/wp-content/uploads/2015/01/football-clip-art-football-clip-art-5-e1346675278471-350x350.png"
            buttonText="Football"
          />
        </CardSection>
        <CardSection>
          <ButtonImage
            uri="https://banner2.kisspng.com/20180315/bpe/kisspng-tennis-balls-clip-art-tennis-ball-cliparts-5aaaf9d3f3dfe4.3520138515211545159989.jpg"
            buttonText="Tennis"
          />
        </CardSection>
      </Card>
    );
};

export default Features;
