/**
* Author: Matt Peters
* could use a ui redesign, also would some sort of list thing be better for performance?
* would a pure.component be more effective than a... const? who knows
* just some things to consider =jm
*/

import React from 'react';
import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Card, CardSection } from '../common';

const BellSchedule = () => {
  const { titleStyle, sectionStyle, viewStyle, subHeadingStyle, infoStyle } = styles;
  return (
    <ScrollView>
      <Card>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <View style={viewStyle}>
            <Text style={titleStyle}>Regular</Text>
          </View>
        </CardSection>
        <CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Period</Text>
              <Text style={infoStyle}>1</Text>
              <Text style={infoStyle}>2</Text>
              <Text style={infoStyle}>E-Block</Text>
              <Text style={infoStyle}>3</Text>
              <Text style={infoStyle}>4</Text>
            </View>
          </CardSection>
          <CardSection style={[sectionStyle, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Start</Text>
              <Text style={infoStyle}>7:20</Text>
              <Text style={infoStyle}>8:44</Text>
              <Text style={infoStyle}>10:09</Text>
              <Text style={infoStyle}>10:49</Text>
              <Text style={infoStyle}>12:44</Text>
            </View>
          </CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>End</Text>
              <Text style={infoStyle}>8:39</Text>
              <Text style={infoStyle}>10:04</Text>
              <Text style={infoStyle}>10:44</Text>
              <Text style={infoStyle}>12:39</Text>
              <Text style={infoStyle}>2:03</Text>
            </View>
          </CardSection>
        </CardSection>
      </Card>

      <Card>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <View style={viewStyle}>
            <Text style={titleStyle}>Early Release</Text>
          </View>
        </CardSection>
        <CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Period</Text>
              <Text style={infoStyle}>1</Text>
              <Text style={infoStyle}>2</Text>
              <Text style={infoStyle}>E-Block</Text>
              <Text style={infoStyle}>3</Text>
              <Text style={infoStyle}>4</Text>
            </View>
          </CardSection>
          <CardSection style={[sectionStyle, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Start</Text>
              <Text style={infoStyle}>7:20</Text>
              <Text style={infoStyle}>8:28</Text>
              <Text style={infoStyle}>N/A</Text>
              <Text style={infoStyle}>9:36</Text>
              <Text style={infoStyle}>10:44</Text>
            </View>
          </CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>End</Text>
              <Text style={infoStyle}>8:20</Text>
              <Text style={infoStyle}>9:28</Text>
              <Text style={infoStyle}>N/A</Text>
              <Text style={infoStyle}>10:36</Text>
              <Text style={infoStyle}>11:44</Text>
            </View>
          </CardSection>
        </CardSection>
      </Card>

      <Card>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <View style={viewStyle}>
            <Text style={titleStyle}>Delayed Opening</Text>
          </View>
        </CardSection>
        <CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Period</Text>
              <Text style={infoStyle}>1</Text>
              <Text style={infoStyle}>2</Text>
              <Text style={infoStyle}>E-Block</Text>
              <Text style={infoStyle}>3</Text>
              <Text style={infoStyle}>4</Text>
            </View>
          </CardSection>
          <CardSection style={[sectionStyle, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Start</Text>
              <Text style={infoStyle}>9:20</Text>
              <Text style={infoStyle}>10:15</Text>
              <Text style={infoStyle}>N/A</Text>
              <Text style={infoStyle}>11:10</Text>
              <Text style={infoStyle}>1:10</Text>
            </View>
          </CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>End</Text>
              <Text style={infoStyle}>10:10</Text>
              <Text style={infoStyle}>11:05</Text>
              <Text style={infoStyle}>N/A</Text>
              <Text style={infoStyle}>1:05</Text>
              <Text style={infoStyle}>2:03</Text>
            </View>
          </CardSection>
        </CardSection>
      </Card>


      <Card>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <View style={viewStyle}>
            <Text style={titleStyle}>Lunches</Text>
          </View>
        </CardSection>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Regular</Text>
              <Text style={infoStyle}>1st</Text>
              <Text style={infoStyle}>2nd</Text>
              <Text style={infoStyle}>3rd</Text>
              <Text style={infoStyle}>4th</Text>
            </View>
          </CardSection>
          <CardSection style={[sectionStyle, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Start</Text>
              <Text style={infoStyle}>10:49</Text>
              <Text style={infoStyle}>11:17</Text>
              <Text style={infoStyle}>11:46</Text>
              <Text style={infoStyle}>12:15</Text>
            </View>
          </CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>End</Text>
              <Text style={infoStyle}>11:12</Text>
              <Text style={infoStyle}>11:41</Text>
              <Text style={infoStyle}>12:10</Text>
              <Text style={infoStyle}>12:39</Text>
            </View>
          </CardSection>
        </CardSection>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <CardSection style={[sectionStyle, { borderRightWidth: 0.5 }]}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Early Release</Text>
            </View>
          </CardSection>
          <CardSection style={[sectionStyle, { borderLeftWidth: 0.5 }]}>
            <View style={viewStyle}>
              <Text style={infoStyle}>Grab And Go</Text>
              <Text style={{ fontSize: 16 }}>11:44 - 12:05</Text>
            </View>
          </CardSection>
        </CardSection>
        <CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Delay</Text>
              <Text style={infoStyle}>1st</Text>
              <Text style={infoStyle}>2nd</Text>
              <Text style={infoStyle}>3rd</Text>
              <Text style={infoStyle}>4th</Text>
            </View>
          </CardSection>
          <CardSection style={[sectionStyle, { borderLeftWidth: 0, borderRightWidth: 0 }]}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>Start</Text>
              <Text style={infoStyle}>11:10</Text>
              <Text style={infoStyle}>11:40</Text>
              <Text style={infoStyle}>12:10</Text>
              <Text style={infoStyle}>12:40</Text>
            </View>
          </CardSection>
          <CardSection style={sectionStyle}>
            <View style={viewStyle}>
              <Text style={subHeadingStyle}>End</Text>
              <Text style={infoStyle}>11:35</Text>
              <Text style={infoStyle}>12:05</Text>
              <Text style={infoStyle}>12:35</Text>
              <Text style={infoStyle}>1:05</Text>
            </View>
          </CardSection>
        </CardSection>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  sectionStyle: {
    flex: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'column',
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  subHeadingStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
    borderBottomWidth: 1,
  },
  infoStyle: {
    borderColor: '#fff',
    color: 'black',
    borderBottomWidth: 2,
    fontSize: 16,
  }
});

export { BellSchedule };
