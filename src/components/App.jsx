import  React  from 'react';
import  FeedbackOptions  from 'components/FeedbackOptions';
import  Statistics  from 'components/Statistics';
import  Notification  from 'components/Notification';
import { Section }  from 'components/Section';

export class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  }
    
  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return total === 0 ? 0 : Math.round((good / total) * 100);
  }
    
  render() {
    const  good = this.state.good;
    const bad = this.state.bad;
    const neutral = this.state.neutral;
    const total = this.countTotalFeedback(good, bad, neutral);
    const positivePercentage = this.countPositiveFeedbackPercentage(
      good,
      bad,
      neutral
    );
    let content;
    if (total === 0) {
      content = <Notification message="There is no feedback" />;
    } else {
      content = (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      );
    }
    return (
      <>
        <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={this.onLeaveFeedback}
          />
          </Section>
        <Section title="Statistics">
          {content}
        </Section>
      </>
    );
  }
}
