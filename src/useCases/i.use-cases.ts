interface UseCase {
    execute(...args:any): Promise<any>
}

export { UseCase }