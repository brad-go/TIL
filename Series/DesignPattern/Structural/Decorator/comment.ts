/**
 * Component Interface
 */
interface CommentService {
  addComment(comment: string): void;
}

/**
 * Concrete Component
 */
class DefaultCommentService implements CommentService {
  addComment(comment: string): void {
    console.log(comment);
  }
}

/**
 * Base Decorator
 */
class CommentDecorator implements CommentService {
  constructor(private commentService: CommentService) {}

  addComment(comment: string): void {
    this.commentService.addComment(comment);
  }
}

/**
 * Concrete Decorator
 * 댓글에 trim 기능을 추가
 */
class TrimmingCommentDecorator extends CommentDecorator {
  addComment(comment: string): void {
    super.addComment(this.trim(comment));
  }

  trim(comment: string): string {
    return comment.replace("...", "");
  }
}

/**
 * Concrete Decorator
 * 스팸 필터링 기능을 제공하는 데코레이터
 */
class SpamFilteringCommentDecorator extends CommentDecorator {
  addComment(comment: string): void {
    if (this.isNotSpam(comment)) super.addComment(comment);
  }

  isNotSpam(comment: string): boolean {
    return !comment.includes("http");
  }
}

/**
 * Client
 */
let enabledSpamFilter = true;
let enabledTrimming = true;

function writeComment(comment: string) {
  let commentService = new DefaultCommentService();
  if (enabledSpamFilter)
    commentService = new SpamFilteringCommentDecorator(commentService);
  if (enabledTrimming)
    commentService = new TrimmingCommentDecorator(commentService);

  commentService.addComment(comment);
}

writeComment("디자인 패턴 스터디");
writeComment("보는게 하는거보다 재밌을 수가 없지...");
writeComment("https://github.com/brad-go");
