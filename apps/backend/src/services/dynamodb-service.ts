import {
  DynamoDBClient,
  type QueryCommandInput,
  type QueryCommandOutput,
  type ScanCommandInput,
  type ScanCommandOutput,
  UpdateItemCommand,
  type UpdateItemCommandInput,
  type UpdateItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import {
  BatchWriteCommand,
  type BatchWriteCommandInput,
  type BatchWriteCommandOutput,
  DeleteCommand,
  type DeleteCommandInput,
  type DeleteCommandOutput,
  DynamoDBDocumentClient,
  GetCommand,
  type GetCommandInput,
  type GetCommandOutput,
  PutCommand,
  type PutCommandInput,
  type PutCommandOutput,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
  type UpdateCommandInput,
  type UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { environment } from '@config/environment';

const credentials = {
  accessKeyId: environment.AWS_KEY,
  secretAccessKey: environment.AWS_SECRET,
};

const dbParams: { region: string; credentials: { accessKeyId: string; secretAccessKey: string }; endpoint?: string } = {
  region: environment.REGION,
  credentials,
  // endpoint: environment.NODE_ENV === "development" ? "http://localhost:8787" : undefined
};

const client = new DynamoDBClient(dbParams);
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

/**
 * @class DynamoService
 * @description Service for the DynamoDB
 */
export default class DynamoService {
  /**
   * @function create
   * @description Create an item in the DynamoDB
   * @param params - The parameters for the create command
   * @returns The result of the create command
   */
  create = async (params: PutCommandInput): Promise<PutCommandOutput> => {
    try {
      return await docClient.send(new PutCommand(params));
    } catch (error) {
      throw new Error(`create-error: ${error}`);
    }
  };

  /**
   * @function batchWrite
   * @description Write a batch of items to the DynamoDB
   * @param params - The parameters for the batch write command
   * @returns The result of the batch write command
   */
  batchWrite = async (params: BatchWriteCommandInput): Promise<BatchWriteCommandOutput> => {
    try {
      return await docClient.send(new BatchWriteCommand(params));
    } catch (error) {
      throw new Error(`batch-create-error: ${error}`);
    }
  };

  /**
   * @function update
   * @description Update an item in the DynamoDB
   * @param params - The parameters for the update command
   * @returns The result of the update command
   */
  update = async (params: UpdateCommandInput): Promise<UpdateCommandOutput> => {
    try {
      return await docClient.send(new UpdateCommand(params));
    } catch (error) {
      throw new Error(`update-error: ${error}`);
    }
  };

  /**
   * @function updateItem
   * @description Update an item in the DynamoDB
   * @param params - The parameters for the update item command
   * @returns The result of the update item command
   */
  updateItem = async (params: UpdateItemCommandInput): Promise<UpdateItemCommandOutput> => {
    try {
      return await docClient.send(new UpdateItemCommand(params));
    } catch (error) {
      throw new Error(`update-error: ${error}`);
    }
  };

  /**
   * @function query
   * @description Query the DynamoDB
   * @param params - The parameters for the query command
   * @returns The result of the query command
   */
  query = async (params: QueryCommandInput): Promise<QueryCommandOutput> => {
    try {
      return await docClient.send(new QueryCommand(params));
    } catch (error) {
      throw new Error(`query-error: ${error}`);
    }
  };

  /**
   * @function scan
   * @description Scan the DynamoDB
   * @param params - The parameters for the scan command
   * @returns The result of the scan command
   */
  scan = async (params: ScanCommandInput): Promise<ScanCommandOutput> => {
    try {
      return await docClient.send(new ScanCommand(params));
    } catch (error) {
      throw new Error(`query-error: ${error}`);
    }
  };

  /**
   * @function get
   * @description Get an item from the DynamoDB
   * @param params - The parameters for the get command
   * @returns The result of the get command
   */
  get = async (params: GetCommandInput): Promise<GetCommandOutput> => {
    try {
      return await docClient.send(new GetCommand(params));
    } catch (error) {
      throw new Error(`get-error: ${error}`);
    }
  };

  /**
   * @function delete
   * @description Delete an item from the DynamoDB
   * @param params - The parameters for the delete command
   * @returns The result of the delete command
   */
  delete = async (params: DeleteCommandInput): Promise<DeleteCommandOutput> => {
    try {
      return await docClient.send(new DeleteCommand(params));
    } catch (error) {
      throw new Error(`delete-error: ${error}`);
    }
  };
}
