export interface Setting {
    id: number;              // Unique identifier for the setting
    name: string;            // Name of the setting
    value: string;           // Value associated with the setting
    createdOn: Date;        // Date the setting was created
    isActive: boolean;       // Status indicating if the setting is active
  }
  