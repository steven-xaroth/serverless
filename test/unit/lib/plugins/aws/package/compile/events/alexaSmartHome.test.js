'use strict';

const expect = require('chai').expect;
const AwsProvider = require('../../../../../../../../lib/plugins/aws/provider');
const AwsCompileAlexaSmartHomeEvents = require('../../../../../../../../lib/plugins/aws/package/compile/events/alexaSmartHome');
const Serverless = require('../../../../../../../../lib/Serverless');

describe('AwsCompileAlexaSmartHomeEvents', () => {
  let serverless;
  let awsCompileAlexaSmartHomeEvents;

  beforeEach(() => {
    serverless = new Serverless({ commands: [], options: {} });
    serverless.service.provider.compiledCloudFormationTemplate = { Resources: {} };
    serverless.setProvider('aws', new AwsProvider(serverless));
    awsCompileAlexaSmartHomeEvents = new AwsCompileAlexaSmartHomeEvents(serverless);
    awsCompileAlexaSmartHomeEvents.serverless.service.service = 'new-service';
  });

  describe('#constructor()', () => {
    it('should set the provider variable to an instance of AwsProvider', () =>
      expect(awsCompileAlexaSmartHomeEvents.provider).to.be.instanceof(AwsProvider));
  });

  describe('#compileAlexaSmartHomeEvents()', () => {
    it('should create corresponding resources when alexaSmartHome events are given', () => {
      awsCompileAlexaSmartHomeEvents.serverless.service.functions = {
        first: {
          events: [
            {
              alexaSmartHome: {
                appId: 'amzn1.ask.skill.xx-xx-xx-xx',
                enabled: false,
              },
            },
            {
              alexaSmartHome: {
                appId: 'amzn1.ask.skill.yy-yy-yy-yy',
                enabled: true,
              },
            },
            {
              alexaSmartHome: 'amzn1.ask.skill.zz-zz-zz-zz',
            },
          ],
        },
      };

      awsCompileAlexaSmartHomeEvents.compileAlexaSmartHomeEvents();

      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome1.Type
      ).to.equal('AWS::Lambda::Permission');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome2.Type
      ).to.equal('AWS::Lambda::Permission');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome3.Type
      ).to.equal('AWS::Lambda::Permission');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome1.Properties.FunctionName
      ).to.deep.equal({ 'Fn::GetAtt': ['FirstLambdaFunction', 'Arn'] });
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome2.Properties.FunctionName
      ).to.deep.equal({ 'Fn::GetAtt': ['FirstLambdaFunction', 'Arn'] });
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome3.Properties.FunctionName
      ).to.deep.equal({ 'Fn::GetAtt': ['FirstLambdaFunction', 'Arn'] });
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome1.Properties.Action
      ).to.equal('lambda:DisableInvokeFunction');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome2.Properties.Action
      ).to.equal('lambda:InvokeFunction');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome3.Properties.Action
      ).to.equal('lambda:InvokeFunction');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome1.Properties.Principal
      ).to.equal('alexa-connectedhome.amazon.com');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome2.Properties.Principal
      ).to.equal('alexa-connectedhome.amazon.com');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome3.Properties.Principal
      ).to.equal('alexa-connectedhome.amazon.com');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome1.Properties.EventSourceToken
      ).to.equal('amzn1.ask.skill.xx-xx-xx-xx');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome2.Properties.EventSourceToken
      ).to.equal('amzn1.ask.skill.yy-yy-yy-yy');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome3.Properties.EventSourceToken
      ).to.equal('amzn1.ask.skill.zz-zz-zz-zz');
    });

    it('should respect enabled variable, defaulting to true', () => {
      awsCompileAlexaSmartHomeEvents.serverless.service.functions = {
        first: {
          events: [
            {
              alexaSmartHome: {
                appId: 'amzn1.ask.skill.xx-xx-xx-xx',
                enabled: false,
              },
            },
            {
              alexaSmartHome: {
                appId: 'amzn1.ask.skill.yy-yy-yy-yy',
                enabled: true,
              },
            },
            {
              alexaSmartHome: {
                appId: 'amzn1.ask.skill.jj-jj-jj-jj',
              },
            },
            {
              alexaSmartHome: 'amzn1.ask.skill.zz-zz-zz-zz',
            },
          ],
        },
      };

      awsCompileAlexaSmartHomeEvents.compileAlexaSmartHomeEvents();

      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome1.Properties.Action
      ).to.equal('lambda:DisableInvokeFunction');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome2.Properties.Action
      ).to.equal('lambda:InvokeFunction');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome3.Properties.Action
      ).to.equal('lambda:InvokeFunction');
      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources.FirstLambdaPermissionAlexaSmartHome4.Properties.Action
      ).to.equal('lambda:InvokeFunction');
    });

    it('should not create corresponding resources when alexaSmartHome events are not given', () => {
      awsCompileAlexaSmartHomeEvents.serverless.service.functions = {
        first: {
          events: ['alexaSkill'],
        },
      };

      awsCompileAlexaSmartHomeEvents.compileAlexaSmartHomeEvents();

      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources
      ).to.deep.equal({});
    });

    it('should not create corresponding resources when events are not given', () => {
      awsCompileAlexaSmartHomeEvents.serverless.service.functions = {
        first: {},
      };

      awsCompileAlexaSmartHomeEvents.compileAlexaSmartHomeEvents();

      expect(
        awsCompileAlexaSmartHomeEvents.serverless.service.provider.compiledCloudFormationTemplate
          .Resources
      ).to.deep.equal({});
    });
  });
});
