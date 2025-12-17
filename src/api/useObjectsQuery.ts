import { useQuery } from '@tanstack/vue-query'
import {fetchObjects} from "@/api/objectsApi.ts";

export function useObjectsQuery() {
    return useQuery({
        queryKey: ['objects'],
        queryFn: fetchObjects,
        staleTime: 5 * 60 * 1000
    })
}
