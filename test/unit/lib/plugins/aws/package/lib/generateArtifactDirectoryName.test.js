'use strict';

const expect = require('chai').expect;
const AwsPackage = require('../../../../../../../lib/plugins/aws/package/index');
const AwsProvider = require('../../../../../../../lib/plugins/aws/provider');
const Serverless = require('../../../../../../../lib/Serverless');

describe('#generateArtifactDirectoryName()', () => {
  let serverless;
  let awsPackage;

  beforeEach(() => {
    serverless = new Serverless({ commands: [], options: {} });
    const options = {
      stage: 'dev',
      region: 'us-east-1',
    };
    serverless.setProvider('aws', new AwsProvider(serverless, options));
    awsPackage = new AwsPackage(serverless, options);
    awsPackage.serverless.cli = new serverless.classes.CLI();
  });

  it('should generate a name for the artifact directory based on the current time', () => {
    awsPackage.generateArtifactDirectoryName();
    expect(awsPackage.serverless.service.package.artifactDirectoryName).to.match(/[0-9]+-.+/);
  });
});
