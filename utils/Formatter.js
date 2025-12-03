export default class Formatter{
    static formatComments(comments){
        comments.forEach((comment, index, array) => {
            const date = new Date(comment.Fecha);

            const formattedDate = date.toLocaleString("es-HN", {
                dateStyle: "medium",
                timeStyle: "short"
            });

            const formattedComment = {
                    id: comment.ID_Comentario,
                    userName: `${comment.Nombre} ${comment.Apellido}`,
                    title: '',
                    content: comment.Texto,
                    image: '',
                    date: formattedDate
            }

            array[index] = formattedComment;
        });
        return comments;
    }

    static formatBranch(branch, branchComments){
        const formattedBranch = {
            id: branch.ID_Sucursal,
            title: branch.Nombre,
            location: branch.Ubicacion,
            freeSpots: branch.Espacios_Disponibles,
            totalSpots: branch.Espacios_Totales,
            distance: 5,
            stars: branch.Calificacion,
            price: branch.Precio_parqueo,
            image: branch.imagen,
            nReviews: branchComments.length,
            reviews: branchComments
        }
        return formattedBranch;
    }
}