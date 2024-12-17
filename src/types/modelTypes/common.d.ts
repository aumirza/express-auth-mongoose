interface SchemaTimestampsConfig {
    createdAt?: boolean | string
    updatedAt?: boolean | string
    currentTime?: () => Date | number
}
