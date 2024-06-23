import React from 'react';
import { ScrollView } from 'react-native';
import { PricingCard, lightColors } from '@rneui/themed';



const Subscribe = () => {
return (
  <>
    <ScrollView>
      <PricingCard
        color={lightColors.primary}
        title="Free trail"
        price="For one month"
        info={['1 User', 'add multiple home']}
        button={{ title: ' GET STARTED'}}
      />
      <PricingCard
        color={lightColors.secondary}
        title="3 month"
        price="$19"
        info={['1 User', 'add multiple home']}
        button={{ title: ' GET STARTED'}}
      />
      <PricingCard
        color={lightColors.secondary}
        title="6 month"
        price="$49"
        info={['1 User', 'add multiple home']}
        button={{ title: ' GET STARTED'}}
      />
    </ScrollView>
  </>
);
};

export default Subscribe;