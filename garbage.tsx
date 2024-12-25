<Dialog>
  <DialogTrigger>
    <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-xl transform transition-all duration-300 hover:scale-105">
      Start Hosting Today
    </Button>
  </DialogTrigger>
  <DialogContent className="border-2 border-emerald-600">
    <DialogHeader>
      <DialogTitle>Do you want to become a Host?</DialogTitle>
      <DialogDescription>
        <Separator className="border border-emerald-500 my-6" />
        <p>
          We are deeply committed to providing top-quality services to our
          customers. Therefore, we kindly request your cooperation in
          maintaining and promoting the best living standards for our guests. We
          trust that you will uphold this commitment and not breach our trust.
        </p>
        <p>
          <span className="text-lg font-semibold text-emerald-400">
            Please note:{" "}
          </span>
          If your hotel has a <b>rating</b> lower than 3, it will be removed
          from our server. Kindly keep this in mind.
        </p>
      </DialogDescription>
    </DialogHeader>
    <Separator className="border border-emerald-500 my-6" />
    <DialogFooter>
      <Button className="bg-emerald-500">I agree</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
